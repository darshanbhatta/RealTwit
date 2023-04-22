[![Discord](https://img.shields.io/discord/1099338934921740371?label=Discord&style=flat&logo=discord)](https://discord.gg/vpBxgyynCR)
[![License](https://img.shields.io/badge/License-GPLv3-blue.svg?style=flat)](https://github.com/darshanbhatta/RealTwit/blob/main/LICENSE)

# RealTwit - See who's really verified on Twitter

<p align="center">
<a href="https://chrome.google.com/webstore/detail/realtwit-see-real-twitter/bgjdcmmlhmjkhbjbjbakljihfpeadjhl"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get RealTwit on Chrome" width="40%"></a>
</p>

---

<p align="center">
  <img alt="Verified" src="https://user-images.githubusercontent.com/36747258/233793776-03f0440b-86cb-4836-944a-6481c73f3ad8.png" width="48%">
&nbsp; &nbsp;
  <img alt="Paid" src="https://user-images.githubusercontent.com/36747258/233793563-b0c93a82-9d8f-405e-a01b-b969071f01cd.png" width="48%">
</p>

Twitter has removed blue checkmarks from legacy verified accounts on April 20th, 2023, leading to confusion and misinformation on the platform. Now only people that are paying 8$/month are verified.

RealTwit displays the actual verification badges of notable individuals and organizations, ensuring clarity and transparency for users. This was accomplished by using a backup of legacy verified users. It also highlights users who have paid for verification through Twitter Blue with a different icon, making it easy to differentiate between verified accounts and those who have paid for verification.

It is important to maintain the integrity of Twitter's verification system and hope that the extension will aid with that.

## Built with

-   React 18
-   Typescript
-   Webpack 5 (esbuild-loader)
-   Eslint
-   Prettier
-   Semantic-Release
-   Custom Messaging & Storage wrappers

## Getting Started

1. Clone this repo
2. Run `npm install`
3. Run `npm start` to start the development server
4. Run `npm run build` to build the extension for production
5. Run `npm run release` to release a new version of the extension in CI (either preview or production)
