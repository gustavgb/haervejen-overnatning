const fs = require('fs')
const path = require('path')

const places = fs
  .readFileSync(path.resolve(__dirname, 'places.csv'), 'utf-8')
  .split(/\n/)
  .filter(Boolean)
  .map(placeRaw => {
    const parts = placeRaw.split(';')
    const loc = parts[0].split(',')
    return {
      lat: loc[0].trim(),
      lon: loc[1].trim(),
      name: parts[1].trim(),
      desc: parts[2].trim().replace(/\\n/, '\n')
    }
  })
  .map(
    place =>
      `<wpt lat="${place.lat}" lon="${place.lon}"><name>${place.name}</name><desc>${place.desc}</desc></wpt>`
  )

const gpx = `<?xml version="1.0"?>
<gpx version="1.1" creator="gpxgenerator.com">
${places.join('\n')}
</gpx>`

fs.writeFileSync(path.resolve(__dirname, 'haervejen-overnatning.gpx'), gpx)
