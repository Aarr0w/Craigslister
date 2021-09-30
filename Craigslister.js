const puppeteer = require('puppeteer');
const $ = require('jquery');

// ['producer']
const keywords = ['composer', 'songwriter', 'songwriting'];
keywords.forEach(i =>{Fill(i);});


async function Fill(keyword) 
{
  //const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  await page.goto('https://www.craigslist.org/about/sites');
  const a = await page.$$("a[href$='craigslist.org/']");

    for(let x = 0; x<413; x++)
    {   
       await addAlerts(page,keyword,a,x);
       await Promise.all([
        page.goto('https://www.craigslist.org/about/sites'),
        page.waitForNavigation()
       ]);
       
    }
    // page.click("a[href='/Settings/AnnouncementsConfiguration/Create']")
        // .catch(function(error){console.log('wasnt there');});

  //await browser.close();
}

async function addAlerts(page,keyword,a,linkNo)
{
  
    // await page.screenshot({path: 'before.png'});
    await a[linkNo].click()
      .catch(async function(error){
          a = await page.$$("a[href$='craigslist.org/']");
          await a[linkNo].click(); });
    await page.waitForNavigation();
    
    var loginRequired = true;
    
    await Promise.all([
      page.click("a[href$='creative-gigs/search/crg']"),
      page.waitForNavigation()
     ]);
    
    
    await page.type('#query', keyword); // Types instantly
    await Promise.all([
      page.click(".saveme"),
      page.waitForNavigation()
     ]);

    await page.type('#inputEmailHandle', 'youremail@gmail.com')
     .catch(function(error){loginRequired = false;});


    if(loginRequired)
    {
      await page.type('#inputPassword', 'yourpassword');
      await Promise.all([
        page.click("#login"),
        page.waitForNavigation()
       ]);
    }

    await Promise.all([
      page.click("button[value$='confirm']")
        .catch(function(error){console.log('no confirm button');}),
      page.waitForNavigation()
     ]);

    //  var unchecked = await page.$$("input[value='0']");
    //  var uncheckedClick = await page.$$("input[type='checkbox']");
    
    // uncheckedClick.forEach(async function(i)
    // { await i.click();
    //   unchecked = await page.$$("input[value='0']");
    //   console.log(unchecked.length + ' unchecked');
    // });

    console.log('completed alert '+linkNo);

    // await Promise.all([
    //   page.goto('https://www.craigslist.org/about/sites'),
    //   page.waitForNavigation()
    //  ]);
  

    //page.click('table:nth-child(2)')

    //await page.screenshot({path: 'after'+row+'.png'});
  
} 


  //  await page.select('select#published', 'true');
  //  await page.screenshot({path: 'publish'+AnncNum+'.png'});