angular
  .module('TheNetwork', [])
  .run(function ($currentUser, $UserResource) {
    $currentUser.set($UserResource.get(5));
  })
  .service('$currentUser', function () {
    var currentUser = null;
    this.set = function (user) {
      currentUser = user;
    };

    this.get = function () {
      return currentUser;
    };
  })
  .factory('$box', function ($window) {
    return $window.Box;
  })
  .factory('$UserResource', function () {
    var usersStorage = [{
                          "id": 1,
                          "username": "James Bond",
                          "pic": "images/profile/Sean-Connery-as-James-Bond.jpg",
                          "about": "Secret Agent, for MI6 code name 007, need I say more?"
                        },
                        {
                          "id": 2,
                          "username": "William Forrester",
                          "pic": "images/profile/2001_finding_forrester_008.png",
                          "about": "I make better writers out of high school kids"
                        },
                        {
                          "id": 3,
                          "username": "Jim Malone",
                          "pic": "images/profile/sean_connery_the_untouchables.jpg",
                          "about": " I picked the men out for Ness's crew from the police academy to go after Capone  "
                        },
                        {
                          "id": 4,
                          "username": "Juan Sanchez Villalobos Ramirez",
                          "pic": "images/profile/Sean_Connery_as_Ramirez_in_Highlander.jpg",
                          "about": "Trained Connor in the art of sword fighting"
                        },
                        
                        
                        {
                          "id": 5,
                          "username": "Daniel Craig",
                          "pic": "images/profile/daniel-craig.jpg",
                          "about": "James Bond reloaded"
                        }];
    return {
      get: function (id) {
        for(var i = 0; i < usersStorage.length; i++) {
          if (usersStorage[i].id === id) {
            return usersStorage[i];
          }
        }
        return null;
      }
    };
  })
  .factory('$PostResource', function ($box) {
    var posts = $box.isset('posts') ? $box.fetch('posts') : undefined;
    var postStorage = posts || [{
            "id": 1,
            "userId": 1,
            "date": "",
            "content":"Love wine? Love food? Love to win an iPad 2 with gift certificates to your favorite IA winery & Dine IA restaurant. http://bit.ly/xQ4Ls8",
            "comments": [
              {
                "id": 13,
                "postId": 1,
                "userId": 3,
                "date": "",
                "content": "Would you happen to know were Capone is? Since you are a secret agent and all"
              }
            
            ]
          },
          {
            "id": 2,
            "userId": 3,
            "date": "",
            "content":"Day 2 of house sitting...awww my firends really do Trust me!",
            "comments": []
          
          },
          {
            "id": 3,
            "userId": 4,
            "date": "",
            "content":"Just got doing some sword fighting with Connor! THERE CAN BE ONLY ONE!",
            "comments": [
              {
                "id": 10,
                "postId": 3,
                "userId": 1,
                "date": "",
                "content": "Let me know when you're going to be going at it again, I would love to join"
              },
              {
                "id": 11,
                "postId": 3,
                "userId": 4,
                "date": "",
                "content": "sure thing"
              }
            
            ]
          
          },
          {
            "id": 4,
            "userId": 2,
            "date": "",
            "content":"How do I even have friends?! Oh wait.... I don't. Glad I have internet firends! I'd be screwed without them... #LameTweetIsLame #hobit #somereallylonghashtag #longcomment #eggs #stuff",
            "comments": []
          
          },
          {
            "id": 5,
            "userId": 3,
            "date": "",
            "content":"I want to thank ALL MY FIRENDS BOTH OLD AND NEW FOR THE ENCOURAGING WORDS....LOVE YOU GUYS!!!!!",
            "comments": []
          
          },
          {
            "id": 6,
            "userId": 1,
            "date": "",
            "content":"Just got back from the moon, they have sharks with lazers on their heads",
            "comments": [
              {
                "id": 12,
                "postId": 6,
                "userId": 2,
                "date": "",
                "content": "Hey, what else was there? I want to write a book on it"
              }
            
            ]
          }
        ];

    function updateLocalStorate() {
      $box.store('posts', postStorage);
    }

    return {
      query: function () {
        return postStorage;
      },
      get: function (id) {
        for (var i = 0; i < postStorage.length; i++) {
          if (postStorage[i].id === id) {
            return postStorage[i];
          }
        }
        return null;
      },
      addComment: function (comment) {
        var comments = this.get(comment.postId).comments;
        comment.id = "unpersisted_" + comments.length; // simple attempt at identity :p
        comments.push(comment);
        updateLocalStorate();
      },
      postUpdate: function (update) {
        update.id = 'unpersisted_' + postStorage.length; // Same attempt at identity :p
        postStorage.push(update);
        updateLocalStorate();
      }
    };
  });