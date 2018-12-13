import firebase from 'firebase'
// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA9voxAWmd38g5QtZHE9RvZAKcoCo8SXTA',
  authDomain: 'pga-leaderboard.firebaseapp.com',
  databaseURL: 'https://pga-leaderboard.firebaseio.com',
  projectId: 'pga-leaderboard',
  storageBucket: 'pga-leaderboard.appspot.com',
  messagingSenderId: '895785262497',
}
const fire = firebase.initializeApp(config)

export default fire
