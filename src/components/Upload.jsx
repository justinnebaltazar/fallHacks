import supabase from "../helper/supabaseClient";
import { useDropzone } from 'react-dropzone'

export const Upload = ({trigger, onClose, onDone}) => {
    const [files, setFiles] = useState([])
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
                    src={file.preview}/>
            </div>
        </div>
    ))
    if (!trigger) return null
    return (
        <div className="bg-[#E2EBF4] flex justify-center items-center fixed items-center inset-0">
            <h1>Upload your Image</h1>
            <div>
            </div>
              
        </div>
    )
}