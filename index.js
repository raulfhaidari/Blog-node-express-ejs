import express from "express";
import bodyParser from "body-parser";
const app = express ();
const port = 3000;
let posts = []

function post(title, content) {
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString()
}

// When new conent is Published, this adds the new content to the home page. 
function createPost(title, content) {
    let newpost = new post(title, content);
    posts.push(newpost);
}

//                     deleting a post
function deletePost(index) {
    posts.splice(index, 1)
};

//                    dit a current content, which takes in the first index of the whole content li. 
function editPost(index, title, content) {
    posts[index] = new post(title, content);
}

//                             Middleware 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"))



//                 ALL THE ROUTES

// Index.ejs          (Home page)
app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts: posts
    });
});

//  View post
app.get("/view/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index]
    res.render("view.ejs", {
        postId: index,
        title: post.title,
        content: post.content
    });
});

//Delete Post
app.post("/delete", (req, res) => {
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});


app.get("/edit/:id", (req, res) => {
    let index = req.params.id;
    let post = posts[index];

    res.render("addpost.ejs", {
        postId: index,
        title: post.title,
        content: post.content
    });
});

// Update an edited post
app.post("/update", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];
    let index = req.body["index"];
    editPost(index, title, content);
    res.redirect("/");
});

//               Create a new post Page
app.get("/addpost", (req, res) => {
    res.render("addpost.ejs")
})


// Saves post and see it on the index.ejs (home page).
app.post("/save", (req, res) => {
    let title = req.body["title"];
    let content = req.body["content"];

    createPost(title, content)
    res.redirect("/")
})

app.listen(port, () => {
    createPost("Classroom Chaos", "So in 8th grade I used to read during class a lot. At the time I was reading an Artemis Fowl book, and for some reason I had two copies of the same book. So one day in my English class we were reading this other book (which I had already finished reading three days earlier), I was reading my own book and when it was finally my turn to read, I had no idea where we were. So the teacher took my book away, I found my spot, read the part and passed it to the next person to start reading."
    );
    createPost("How to win at video games", "When I was little, I would go on Nickelodeon.com all the time and they had this game similar to Club Penguin, except it was called Nicktropolis. And if you forgot your password, a security question you could choose was “What is your eye color?” and if you got it right it’d tell you your password. So I would go to popular locations in Nicktropolis and write down random usernames who were also in those areas, and then I would log out and type in the username as if it were my own and see which of these usernames had a security question set to “What is your eye color?” (Which was most of them, since it was easy and we were all kids). I would then try either brown, blue, or green, and always get in, then I would go to their house and send all of their furniture and decorations to my own accounts. And if I didn’t want it, I could sell it for money.")

    console.log(`Lyssnar på port ${port}.`)
})