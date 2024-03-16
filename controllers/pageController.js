const Column = require('../models/Column');
const Author = require('../models/Author')
const About = require('../models/About')
const nodemailer = require("nodemailer");
exports.getIndexPage = async (req, res) => {
  const about = await About.find();
  res.status(200).render('index', {
    page_name: 'index',
    about,
  })
}


exports.getAboutEdit = async (req, res) => {
  try {
    const about = await About.find({ _id: req.params.id });
    res.status(200).render('about-edit', {
      page_name: 'index',
      about
    });
  } catch (error) {
    console.error("Error fetching about data:", error);
    res.status(500).send("An error occurred while fetching about data.");
  }
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact'
  })
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login'
  })
}

exports.getSignPage = (req, res) => {
  res.status(200).render('signup', {
    page_name: 'signup'
  })
}


exports.getAddPostPage = async (req, res) => {

  //const author = await Author.findById(req.session.userID)
  res.status(200).render('add-post', {
    page_name: 'add-post',
    //author
  })

}

exports.createAbout = async (req, res) => {
  const about = await About.create({
    title: req.body.title,
    content: req.body.content

  })
  await about.save();
  //res.redirect('/')
}

exports.updateAbout = async (req, res) => {
  try {
    const aboutId = req.params.id;
    const updateData = {
      title: req.body.title,
      content: req.body.content
    };

    const updatedAbout = await About.findByIdAndUpdate(aboutId, updateData, { new: true });

    if (!updatedAbout) {
      return res.status(404).send("The about page with the given ID was not found.");
    }

    res.status(200).redirect('/');
  } catch (error) {
    console.error("Error updating about data:", error);
    res.status(500).send("An error occurred while updating about data.");
  }
};

exports.createColumn = async (req, res) => {
  try {
    const userID = req.session.userID;


    const column = await Column.create({
      title: req.body.title,
      miniContent: req.body.miniContent,
      content: req.body.content,
      author: userID
    })

    await column.save();
    const author = await Author.findById(userID);
    if (author) {
      author.columns.push(column._id);
      await author.save();
    }
    res.redirect('/')

  } catch {
    res.status(400).json({
      status: 'fail',
      // message: error.message
    })
  }
}

exports.sendMail = async (req, res) => {

  const htmlTemplate = `
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Simple Transactional Email</title>
        <style>
          /* -------------------------------------
              GLOBAL RESETS
          ------------------------------------- */
          
          /*All the styling goes here*/
          
          img {
            border: none;
            -ms-interpolation-mode: bicubic;
            max-width: 100%; 
          }
    
          body {
            background-color: #f6f6f6;
            font-family: sans-serif;
            -webkit-font-smoothing: antialiased;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%; 
          }
    
          table {
            border-collapse: separate;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 100%; }
            table td {
              font-family: sans-serif;
              font-size: 14px;
              vertical-align: top; 
          }
    
          /* -------------------------------------
              BODY & CONTAINER
          ------------------------------------- */
    
          .body {
            background-color: #f6f6f6;
            width: 100%; 
          }
    
          /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
          .container {
            display: block;
            margin: 0 auto !important;
            /* makes it centered */
            max-width: 580px;
            padding: 10px;
            width: 580px; 
          }
    
          /* This should also be a block element, so that it will fill 100% of the .container */
          .content {
            box-sizing: border-box;
            display: block;
            margin: 0 auto;
            max-width: 580px;
            padding: 10px; 
          }
    
          /* -------------------------------------
              HEADER, FOOTER, MAIN
          ------------------------------------- */
          .main {
            background: #ffffff;
            border-radius: 3px;
            width: 100%; 
          }
    
          .wrapper {
            box-sizing: border-box;
            padding: 20px; 
          }
    
          .content-block {
            padding-bottom: 10px;
            padding-top: 10px;
          }
    
    
        </style>
      </head>
      <body>
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
          <tr>
            <td>&nbsp;</td>
            <td class="container">
              <div class="content">
    
                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">
    
                  <!-- START MAIN CONTENT AREA -->
                  <tr>
                    <td class="wrapper">
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td>
                          <p>Isim: ${req.body.name}</p>
                            <p>Email: ${req.body.email}</p>
                            <p>Konu: ${req.body.subject}</p>
                            <p>Mesaj: ${req.body.message}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
    
                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
    
    
              </div>
            </td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </body>
    </html>
    `

  try {

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    await transporter.sendMail({
      to: "cavga1997@gmail.com",
      subject: `MAIL FROM ${req.body.email}`,
      html: htmlTemplate,
    })
    res.status(200).redirect("/contact")
  } catch (error) {
    res.status(500).json({
      succeded: false,
      error,
    })
  }
}