import './Label.scss'

const Label = (props) => {

    const {
        title
    } = props

    return (
        <span className='label'>{title}</span>
    )
}

export {Label}