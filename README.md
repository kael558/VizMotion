# VizMotion

<a name="readme-top"></a>

[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#-what-is-this">What is this?</a></li>
    <li>
      <a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#-quick-install">Quick Install</a></li>
        <li><a href="#-running-the-application">Running the Application</a></li>
      </ul>
    </li>
    <li><a href="#-how-it-works">How It Works</a></li>
    <li><a href="#-roadmap">Roadmap</a></li>
    <li><a href="#-business-case">Business Case</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
  </ol>
</details>

## 🤔 What is this?
VizMotion is a revolutionary tool designed to simplify the creation of animated diagrams. It allows users to generate animations from text input, make real-time edits to shapes and text during playback, and seamlessly pause to refine details. VizMotion aims to enhance the learning experience by providing visual explanations for complex concepts.

## 📖 Getting Started 
Navigate to `https://kael558.github.io/VizMotion/` to access the application.

## 🔧 How It Works
1. User inputs text describing the desired animation
2. Input is sent to IBM Granite model (code-34b)
3. Generated text is parsed and matched to icons/images/logos stored in Pinecone
4. Matched elements are sent to the front-end for user interaction
5. Users can edit and download the animation as a video

## 📅 Roadmap
- [ ] Set up a pipeline to create a dataset from user requests and edited animations
- [ ] Finetune the output format and language model
- [ ] Improve the editing process (time slice editing, element-specific editing)
- [ ] Expand video export formats (mp4, gifs, animated SVGs)
- [ ] Allow users to incorporate their own branding logos and images

## 💼 Business Case
- Target market: Education sector (multi-billion dollar industry)
- Applications: Educational resources, documentation, YouTube content, blogs
- Easy integration as an embed into existing websites
- Caters to visual learners, enhancing understanding of complex concepts

## 🤝 Contributing
Contributions are welcome! Please fork the project and create a pull request with your suggested changes.

## ⚖️ License
Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[license-shield]: https://img.shields.io/github/license/kael558/VizMotion.svg?style=for-the-badge
[license-url]: https://github.com/kael558/VizMotion/blob/main/LICENSE