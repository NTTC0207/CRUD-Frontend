import { useState, useEffect } from "react";
import { Avatar, Modal, Button, Upload,Image } from "antd";
import ImgCrop from "antd-img-crop"
import { ImageWrapper } from "../style";


interface Bio {
    imageUrl: string,
    name: string
}



const ImageUpload: React.FC<Bio> = ({ imageUrl, name }) => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [profileImage, setProfileImage] = useState<String>("https://avatars.githubusercontent.com/u/25733842?s=40&v=4")

    // const showModal = () => {
    //   setIsModalOpen(true);
    // };
    // const handleOk = () => {
    //   setIsModalOpen(false);
    // };
    // const handleCancel = () => {
    //   setIsModalOpen(false);
    // };
    // const onChange=(res:any)=>{
    //     console.log(res.file)

    // }

    return (
        <ImageWrapper>

            <div>
                <Avatar src={imageUrl} size="large" />
            </div>




        </ImageWrapper>
    )
}


export default ImageUpload;