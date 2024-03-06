import './InteractionButton.scss'

const InteractionButton = (props) => {

    const {
        title,
        styles,
        onClickHandler
    }  = props

    return (
        <div
            className='interactionButton'
            style={styles}
            onClick={onClickHandler}
        >
            {title}
        </div>
    )
}

export {InteractionButton}