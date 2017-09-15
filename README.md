# Fanny Friendly LLC Website

This repo contains all the source code for the Fanny Friendly LLC website - www.fannyfriendlyllc.com.
Fanny Friendly is a limited liability company registered in the State of Wisconsin that sells hand-held bidets.

I built this website with a combination of several technologies, some of which I'll name here:
- node and npm
  - notable npm libraries used are express, mongoose, and passportjs
- MongoDB
  - tests were run on a locally installed VM, but in production the data resides in an mlab mongodb instance
- Bootstrap (I didn't use a robust frontend framework for this project)

The production web app / website is running on a hosted Linode server in which I also run my personal website.

## How to Deploy the Site from Source

1. clone or download the source code
1. run `npm install` from the root directory to install package dependencies and create the `node_modules/` folder
1. edit the `local-env.sh` file to include the correct server-side variables for the website. These include:
   * `DATABASEURL` - the connection string for the mongodb database storing data
   * `PORT` - port where node will serve up the app
   * `ADMINUSER` - the username of the site administrator who can add/edit/delete data
   * `ADMINPWD` - the password of the site administrator user
   * `REPOPULATE` - determines whether or not data should be purged from the mongodb database and repopulated
1. run `source local-env.sh` to make the variables local to the shell
1. run `node app.js` within that same shell from the previous step to start the web app

## How to Administer this Site

'Administer' in this context means being able to add/edit/remove content on the site without needing to modify source code. This website has a `Login` button on the upper right of the page (or within the collapsed navbar on smaller devices). Clicking on this button will lead you to the `/login` screen. Once authenticated, you are now the admin user. This means you will see additional buttons that allow for manipulating data on the site.

Here are the operations an admin user can perform:
- Products
   - Add, Edit, Delete
- Testimonials
   - Add, Edit, Delete
- Photos (Gallery)
   - Add, Edit, Delete

A few things to keep in mind when performing admin operations:
1. Operations cannot be undone. There is no history tracked for any data, so please be careful with your mouse clicks!
1. Make sure to upload all images to imgur, then specify the imgur URL in the site
1. Descriptions are expressed in html, which means you should leverage \<br\> tags to designate line breaks.

## Notes
- Most of the images used in this site are stored in imgur. The initial set of product photos and gallery images are uploaded to stevenlc's imgur site: http://stevenlc.imgur.com/all/
- Since there is very little data on the site, all data is stored in a sandbox mongodb database on mLab
- Within the Linode server where the web app is running, you can access the app's console by SSHing into the box and looking at the appropriate `screen` session.

## Questions

Please direct any questions to me - stevenlc@alum.mit.edu
