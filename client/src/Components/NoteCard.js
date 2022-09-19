import React, { useContext } from 'react';
import moment from 'moment';
import noteContext from '../context/notes/NoteContext';

function NoteCard(props) {
	const context = useContext(noteContext);
	const { deleteNote } = context;
	return (
		<div className='my-4'>
			<div className='card m-auto'>
				<div className='card-body cardBody bg-dark'>
					<h5 className='card-title cardText' id='cardTitle'>
						{props.title}
					</h5>
					<br />
					<p className='card-text cardText'>{props.description}...</p>
					<p className='card-text cardText'>{props.tag}</p>
					<p className='card-text mb-3'>
						<small className='text-muted '>
							Modified {moment(props.date).startOf('minutes').fromNow()}
						</small>
					</p>
					<button
						type='button'
						className='btn btn-primary '
						onClick={() => {
							props.updateNote(props.note);
						}}
					>
						Edit
					</button>
					<button
						type='button'
						className='btn btn-danger mx-2'
						onClick={() => {
							deleteNote(props.id);
						}}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default NoteCard;
