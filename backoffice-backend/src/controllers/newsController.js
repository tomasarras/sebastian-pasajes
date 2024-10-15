//import * as newsService from "../services/newsService.js";

export default {
  
  /**
   * /news [GET]
   * @returns 200 and array of @News
   */
  getAll: async (req, res, next) => {
    try {
      //const news = await newsService.getAll();
      //res.status(200).json(news);
      //TODO: get news from db
      res.status(200).json([{
        title: 'titulo',
        subtitle: 'subtitulo',
        text: 'text',
        isUrgent: false
      }]);
    } catch (e) {
      next(e);
    }
  },

};