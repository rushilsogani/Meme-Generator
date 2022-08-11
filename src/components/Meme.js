import React, {useRef} from "react";
import { exportComponentAsJPEG } from "react-component-export-image";

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "" 
    })
    const [allMemes, setAllMemes] = React.useState([])
    
    React.useEffect(() => {
        async function getMemes() {
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemes(data.data.memes)
        }
        getMemes()
    }, [])
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

    const componentRef=useRef();
    
    return (
        <main>
            <div className="form">
                    <input 
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                    <input 
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                    <button 
                        className="form--button"
                        onClick={getMemeImage}
                    >
                        Get a new meme image 🖼
                    </button>
            </div>

            <div className="meme">
                <div ref={componentRef}>
                    <img src={meme.randomImage} className="memeimage"/>
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
                <button className="export" onClick={() => exportComponentAsJPEG(componentRef)}>
                    Export As JPEG
                </button>
            </div>
        </main>
    )
}