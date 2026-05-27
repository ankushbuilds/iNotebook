import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';


const Notes = (props) => {
  const showAlert = props.showAlert;

  const context = useContext(noteContext);
    const navigate = useNavigate();
      const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else {
      navigate('/login');
    }
  }, []);

  const ref = useRef(null); // Ref for opening the modal
  const refClose = useRef(null); // Ref for closing the modal

  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const updateNote = (currentNote) => {
    ref.current.click();


    setNote({
      id: currentNote._id || "",
      title: currentNote.title || "",
      description: currentNote.description || "",
      tag: currentNote.tag || ""
    });
  };





  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleClick = (e) => {
    refClose.current.click();
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag);
    props.showAlert("Updated Successfully", "success");


  }
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" ref={ref} className="d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            {/* Modal Body */}
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="title" value={note.title} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="description" value={note.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3 notes-section">
        <h2>Your Notes</h2>
        {notes.length === 0 && <div className="alert alert-warning mx-3">Please add some notes.</div>}
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />;
        })}
      </div>
    </>

  )

}

export default Notes
