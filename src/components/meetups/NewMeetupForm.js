import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { useRef, useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../../firebase/firebase";
import { AiFillCheckCircle } from "react-icons/ai";

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  // const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descInputRef = useRef();

  const [progress, setProgess] = useState(0);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [isLoadingImg, setIsLoadingImg] = useState(false);
  const [imagepreview, setImagepreview] = useState("");

  const setDisabledHandler = () => {
    const value = imageUrl && titleInputRef.current.value && addressInputRef.current.value && descInputRef.current.value;
    // console.log(!value)
    setDisabled(!value);
  }

  const uploadHandler = (event) => {
    // console.log(event.target.files[0]);
    let isReupload = false;
    if (imageUrl) {
      isReupload = window.confirm("You have uploaded image. By selecting another image, your previous image will be replaced. Are you sure?");
      if (isReupload) {
        setImageUrl("");
      } else {
        return;
      }
    }
    const file = event.target.files[0];

    if (file) {
      setImage(file);
      setProgess(0);
      const reader = new FileReader();
      reader.onload = () => {
        setImagepreview(reader.result);
        setImageUrl("");
      }
      reader.readAsDataURL(file);
    }
  };

  const uploadToStorageHandler = () => {
    if (!image) return;
    setIsLoadingImg(true);
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgess(prog);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          // console.log(url);
          setIsLoadingImg(false);
          setProgess(0);
          setDisabledHandler();
        });
      }
    );
  };
  function submitHandler(event) {
    event.preventDefault(); //from js

    const enteredTitleInput = titleInputRef.current.value;
    // const enteredImageInput = imageInputRef.current.value;
    const enteredAddressInput = addressInputRef.current.value;
    const enteredDescInput = descInputRef.current.value;

    //To-do: update the validation
    //validate
    if (
      !imageUrl ||
      !enteredTitleInput ||
      !enteredAddressInput ||
      !enteredDescInput
    ) {

      return;
    }

    const meetupData = {
      title: enteredTitleInput,
      image: imageUrl,
      address: enteredAddressInput,
      desc: enteredDescInput,
      fav: false,
    };
    // console.log(meetupData);
    props.onAddMeetup(meetupData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} onChange={setDisabledHandler} />
        </div>

        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="file" required id="image" onChange={uploadHandler} accept="image/*" />


          <div>
            {imagepreview && (
              <img
                src={imagepreview}
                alt="uploadImage"
                className={classes.imageview}
                placeholder="Select image"
              />
            )}

          </div>
          {imagepreview && !imageUrl &&
            <div className={classes.uploadbtn}>
              <button disabled={isLoadingImg} onClick={uploadToStorageHandler}>Upload</button>
            </div>
          }
          {(isLoadingImg || progress > 0) && <h3 className={classes.upload}>Uploading... {progress}%</h3>}
          {imageUrl && <h3 className={`${classes.upload} ${classes.completed}`}><span><AiFillCheckCircle size={45} color="green" /></span>Upload successfully</h3>}
        </div>

        <div className={classes.control}>
          <label htmlFor="address">Meetup address</label>
          <input type="text" required id="address" ref={addressInputRef} onChange={setDisabledHandler} />
        </div>

        <div className={classes.control}>
          <label htmlFor="desc">Meetup description</label>
          <textarea rows="5" required id="desc" ref={descInputRef} onChange={setDisabledHandler}></textarea>
        </div>

        <div className={classes.actions}>
          <button disabled={disabled}>Add Meetup</button>
        </div>
      </form>
    </Card>
  )
}

export default NewMeetupForm;
