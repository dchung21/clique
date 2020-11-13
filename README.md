# Clique: YHacks 2020 Project

### Inspiration + Description
Our inspiration came from us really missing those real life encounters that we make with people on a daily basis. In college, we quite literally have the potential to meet someone new everyday: at the dining hall, the gym, discussion section, anywhere. However, with remote learning put into place with most universities, these encounters are now nonexistent. The interactions through people on Zoom just weren't cutting it for meeting new people and starting organic relationships with other people. 

We created Clique: an app that would encourage university students to organically meet each other. To remove barriers of social anxiety and awkwardness, Clique makes its users anonymous. We only let users upload an image that is not themselves and a 10 words bio to describe themselves. This way it's similar to real life encounters they would've made on campus where they wouldn't even know the other person's name. This also removes inherent biases of judging people by their appearance. After signing up, users can swipe through other users' profiles and decide if their image and bio is interesting enough for them to strike up a conversation.

### Technical Details
We used React for the frontend and Google Firebase for the backend. 

#### Front End
Clique contains 4 core pages: Login/Signup, Profile, Match, Conversations. We used React Bootstrap for many of the components to create a minimalistic design. All of the pages interact with the user and also interact with the backend. For finishing touches we added a navigation bar for easy access and loading animations to improve the user experience.

#### Back End
We used Firebase auth to handle logins and signups. Upon signups, we would add a new entry in Firestore hashing the entry with the unique user id. The entry in Firestore would contain a default bio. When the user would upload an image to their profile, we would hash that image with their uid as well for fast lookup. This way we can easily pull data relevant to current user because we can search for data tagged with their unique user id. Our chat functionality creates a new an entry for every conversation between two users and continually updates that entry in a sub-entry as the conversation goes on. Our matching functionality randomly generates users that we have never matched with before by checking hashes in the users match history.

We really embraced our will to break down the barriers that prevent bringing people together to build a user-focused product to help people make connections in a socially distant way. :-)

### Youtube Demo:
[See the video here.](https://youtu.be/Mjf2Wdn-6oI)

### Devpost Link:
[See our submission here.](https://devpost.com/software/clique-a3zdwr)
