import { links, Link, LinkType } from "./links";
import { playSiren } from "./play";
import { sendMessage } from "./sendMessage";
import formatISO from "date-fns/formatISO";
import { Page } from "playwright/types/types";

const { firefox } = require("playwright");

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const handleStockAvailability = async (
  link: Link,
  stockFound: boolean,
  page: Page
) => {
  if (!stockFound) {
    console.log(`Still no stock for ${link.name}`);
    return;
  }
  console.log(`🚨 ${" "}There might be a ${link.name} in stock at ${link.url}`);
  await page.screenshot({
    path: `screenshots/screenshot-${formatISO(new Date())}.png`,
  });
  await sendMessage(link);
  await playSiren();
};

export const checkPages = async () => {
  const browser = await firefox.launch({ headless: true });
  const browserContext = await browser.newContext({
    viewport: {
      width: 2560,
      height: 1440,
      deviceScaleFactor: 2,
    },
  });

  for (const link of links) {
    const page = await browserContext.newPage();
    if(link.type === LinkType.MEO || link.type === LinkType.ELCORT )
      await page.goto(link.url, { waitUntil: 'networkidle' });
    else
      await page.goto(link.url);

    if (link.type === LinkType.AMAZON) {
      if (link.dataDefaultAsin) {
        const variantButton = await page.$(
          `li[data-defaultasin=${link.dataDefaultAsin}] button`
        );
        if (variantButton) {
          // There might be some cookies banners or modals, we ignore them
          await variantButton.click({ force: true });
          // FIXME: Next assertion is done before page reload for some reason, so we wait
          await sleep(1500);
        }
      }
      const addToCartButton = await page.$(
        "#desktop_buybox_feature_div #addToCart input#add-to-cart-button"
      );
      await handleStockAvailability(link, !!addToCartButton, page);
    }

    if (link.type === LinkType.MEDIAMARKT) {
      const addToCartButton = await page.$('[id="AddToCart"][disabled="disabled"]');
      await handleStockAvailability(
        link,
        !addToCartButton,
        page
      );
    }

    if (link.type === LinkType.MEO) {
      const addToCartButton = await page.$(".unavailable-txt");
      await handleStockAvailability(link, !addToCartButton, page);
    }
    if (link.type === LinkType.NOS) {
      const addToCartButton = await page.$('[ng-show="!selectedProductVariant.HasAnyStoreStock && !checkingStoreStocks"]');
      await handleStockAvailability(link, !addToCartButton, page);
    }
    if (link.type === LinkType.ELCORT) {
      const addToCartButton = await page.$('[data-event="add_to_cart"][message="Esgotado"]');
      await handleStockAvailability(link, !addToCartButton, page);
    }

    await page.close();
  }

  await browserContext.close();
  await browser.close();
};
