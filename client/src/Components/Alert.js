import React from 'react';

function Alert(props) {
	return (
		<div
			style={{
				position: `fixed`,
				left: '0',
				right: '0',
				marginLeft: 'auto',
				marginRight: 'auto',
				zIndex: '99',
			}}
		>
			{props.alert && (
				<div>
					<div
						className={`alert alert-${props.alert.type} alert-dismissible fade show`}
						role='alert'
						style={{ fontSize: '0.9rem' }}
					>
						<strong>{props.alert.message}</strong>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='alert'
							aria-label='Close'
						></button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Alert;
