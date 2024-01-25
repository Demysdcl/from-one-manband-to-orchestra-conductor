import { FC } from 'react'

interface CardProps {
  image?: string
  title?: string
  body?: string
  button1?: string
  button2?: string
}

const Card: FC<CardProps> = ({ image, title, body, button1, button2 }) => {
  return (
    <div className="card">
      {image && <img src={image} alt="Card" className="card-image" />}
      {title && <h2 className="card-title">{title}</h2>}
      {body && <p className="card-body">{body}</p>}
      {(button1 || button2) && (
        <div className="card-buttons">
          {button1 && <button className="card-button">{button1}</button>}
          {button2 && <button className="card-button">{button2}</button>}
        </div>
      )}
    </div>
  )
}

export default Card
