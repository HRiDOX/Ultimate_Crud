import { useState } from "react";
import { useGetIdentity } from '@pankod/refine-core';
import { FieldValues,useForm } from '@pankod/refine-react-hook-form';
import { useNavigate } from '@pankod/refine-react-router-v6';
import Form from "components/common/Form";
import { readFile } from "fs";

const CreateProperty = () => {
  const navigate = useNavigate();
  const {data:user} = useGetIdentity(); //This will allow us to get all user info
  const [propertyImage,setPropertyImage] = useState({name: '',url: ''});
  const {refineCore: {onFinish,formLoading},register,handleSubmit} = useForm(); 
  const handleImageChange = (file:File) => {
    const reader = (readFile:File) => new Promise<string>((resolve,reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result as string);
      //This handler is called when the file has been successfully read and its contents are available as a result property of the FileReader object. 
      //The resolve function is called with the result property, which is cast as a string.
      fileReader.readAsDataURL(readFile);
      //this line starts the file reading process by calling the readAsDataURL method of the FileReader object. This method reads the contents of the file 
      //and converts them into a Base64-encoded data URL.
    });

    reader(file).then((result:string) => 
      setPropertyImage({ name: file?.name,url: result})
    );

  };
  const onFinishHandler = async (data: FieldValues) => {
    if (!propertyImage.name) {
      return alert('Please Select An Image ');
    }

    await onFinish({...data,photo:propertyImage.url,email:user.email})
  };
  return (
    <Form 
      type="Create"
      register={register}
      onFinish = {onFinish}
      formLoading = {formLoading}
      handleSubmit = {handleSubmit}
      handleImageChange = {handleImageChange}
      onFinishHandler = {onFinishHandler}
      propertyImage = {propertyImage}
    />
  )
}

export default CreateProperty
