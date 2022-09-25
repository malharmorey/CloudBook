import React, { useContext } from 'react';
import moment from 'moment';
import noteContext from '../context/notes/NoteContext';
import '../StyleSheets/noteCard.css';

function NoteCard(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	return (
		<div className='my-4'>
			<div className='card m-auto' id='divCard'>
				<div className='card-body cardBody'>
					<h4 className='card-title' id='cardTitle'>
						{props.title}
					</h4>

					<p className='card-text cardNote'>{props.description}</p>
					<p className='card-text cardTag'>{props.tag}</p>
					<p className='card-text mb-3'>
						<small>
							Modified {moment(props.date).startOf('minutes').fromNow()}
						</small>
					</p>

					<i
						className='fa-regular fa-pen-to-square fa-lg text-warning'
						role='button'
						onClick={() => {
							props.updateNote(props.note);
						}}
					></i>

					<i
						className='fa-regular fa-trash-can mx-4 fa-lg text-danger'
						role='button'
						onClick={() => {
							deleteNote(props.id);
						}}
					></i>
				</div>
			</div>
		</div>
	);
}

export default NoteCard;
