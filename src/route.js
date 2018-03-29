import main from './controllers/main'

export default (app) => {
    app.use('/', main)
}