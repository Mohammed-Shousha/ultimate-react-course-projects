import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded.');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImage = newCabin.image instanceof File;

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );

  const imagePath = hasImage
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  // 1. Create/Edit a new cabin
  let query = supabase.from('cabins');

  // A) Create
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) Edit
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be created.');
  }

  if (!hasImage) return data;

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if the image upload fails
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);

    console.log(storageError);
    throw new Error(
      'Cabin image could not be uploaded, and the cabin was not created.'
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted.');
  }

  return data;
}
