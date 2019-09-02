const functions = require('firebase-functions');
const admin = require('firebase-admin');
const LINKS_PER_PAGE = 3; 

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.getCursor = functions.https.onRequest((request, response) => {
  response.set('Access-Control-Allow-Origin', '*');
  let linksRef = db.collection('links');
  const offset = Number(request.query.offset);
  linksRef
    .orderBy('created', 'desc')
    .limit(LINKS_PER_PAGE)
    .offset(offset)
    .get()
    .then(snap => {
      const links = snap.docs.map(doc => {
        return { id: doc.id, ...doc.data() };
      });
      return response.json(links); 
    })
    .catch(err => console.log(err));
});
