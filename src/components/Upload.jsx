import { useState, useEffect } from "react";
import supabase from "../helper/supabaseClient";
import { useDropzone } from 'react-dropzone'

export const Upload = ({trigger, onClose, onDone}) => {
    const [files, setFiles] = useState([])
    const [type, setType] = useState("")
    const [dresscode, setDresscode] = useState("")
    const [pants, setPants] = useState("")
    const [sleeves, setSleeves] = useState("")

    const {getRootProps, getInputProps} = 
    useDropzone({
        accept: {
            'image/*':[]
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            ))
        }
    });
    const thumbs = files.map(file => (
        <div className="" key={file.name}>
            <div>
                <img
                    src={file.preview}
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}/>
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => 
            URL.revokeObjectURL(file.preview))
    }, [files])

    const handleSubmit = () => {
        
    }

    if (!trigger) return null
    return (
        <div className="flex justify-center items-center absolute items-center inset-0">
            <div className= "flex flex-col items-center bg-[#E2EBF4] p-4 w-6/12 h-5/6 rounded-lg">
                <h1 className="pt-4 pb-4 text-[#5885AF] text-2xl">Upload your Image</h1>

                <div className="flex flex-row w-full h-full justify-between gap-10">
                    {/* dropzone */}
                    <div {...getRootProps({className: 'dropzone'})} className="flex-1 bg-[#5885AF] flex items-center justify-center rounded-lg cursor-pointer h-full">
                        <div className="bg-[#5885AF]">
                            <input {...getInputProps()}/>
                            <p className="text-white">Drop or select your files</p>
                        </div>
                    </div>

                    {/* form */}
                    <div>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                            <select value={dresscode} className="justify-between items-center unset bg-[#D9D9D9] text-white p-3 rounded-lg">
                                <option value="" selected>Dress Code</option>
                                <option value="casual">casual</option>
                                <option value="semi-casual">semi-casual</option>
                                <option value="formal">formal</option>
                            </select>

                            <select value={type} className="justify-between items-center unset bg-[#D9D9D9] text-[#274472] p-3 rounded-lg">
                                <option value="" selected>Clothing Type</option>
                                <option value="top">top</option>
                                <option value="pants">pants</option>
                                <option value="shoes">shoes</option>
                            </select>

                            <select value={pants} className="justify-between items-center unset bg-[#D9D9D9] text-[#274472] p-3 rounded-lg">
                                <option value="" selected>Pants Length</option>
                                <option value="ankle">ankle length</option>
                                <option value="knee-length">knee length</option>
                                <option value="shorts">shorts</option>
                            </select>

                            <select value={sleeves} className="justify-between items-center unset bg-[#D9D9D9] text-[#274472] p-3 rounded-lg">
                                <option value="" selected>Sleeve Length</option>
                                <option value="tank-top">tank-top</option>
                                <option value="t-shirt">t-shirt</option>
                                <option value="elbow-length">elbow-length</option>
                                <option value="long-sleeve">long sleeve</option>
                            </select>

                            <button className="cursor-pointer justify-between items-center unset bg-[#274472] text-[#D9D9D9] p-3 rounded-lg">Submit</button>
                            <button onClick={onClose} type="button" className="cursor-pointer justify-between items-center unset bg-[#41729F] text-[#D9D9D9] p-3 rounded-lg">Cancel</button>
                        </form>
                    </div>
                </div>
                <aside></aside>
            </div>
              
        </div>
    )
}