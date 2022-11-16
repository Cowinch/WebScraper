const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const PORT = 8000

const app = express()

app.use(express.json())

const url = 'http://www.theguardian.com/uk'
axios(url)
    .then(res => {
        const html=res.data
        const $ = cheerio.load(html)
        const articles= []
        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const link= $(this).find('a').attr('href')
            articles.push({
                title,
                link
            })
        })
        console.log(articles)
    })
    .catch(err => console.log(err))
// app.get('/api', (req, res) => {
//     res.send('Hello World!')
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))