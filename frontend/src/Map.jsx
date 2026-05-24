import React from 'react'

export default function Map() {
  const taroudantMapUrl = "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Taroudant+Maroc&zoom=14"
  const staticMapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=-8.8982%2C30.4432%2C-8.8510%2C30.4922&layer=mapnik"

  return (
    <div>
      <h2>Carte de Taroudant</h2>
      <iframe
        title="Carte Taroudant"
        src={staticMapUrl}
        width="100%"
        height="500"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    </div>
  )
}