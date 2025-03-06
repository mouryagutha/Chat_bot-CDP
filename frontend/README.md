# QueryAI - CDP Chatbot

## Overview
QueryAI is a chatbot designed to answer "how-to" questions related to four Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. The chatbot extracts relevant information from the official documentation of these CDPs to guide users on performing tasks within each platform.

## Objective
The goal of QueryAI is to provide quick and accurate responses to user queries related to CDPs, helping them navigate and utilize these platforms efficiently.

## Core Functionalities
1. **Answer "How-to" Questions:**
   - Understands and responds to user questions about performing specific tasks in each CDP.
   - Example questions:
     - "How do I set up a new source in Segment?"
     - "How can I create a user profile in mParticle?"
     - "How do I build an audience segment in Lytics?"
     - "How can I integrate my data with Zeotap?"

2. **Extract Information from Documentation:**
   - Retrieves relevant information from the official documentation.
   - Navigates through documentation, identifies relevant sections, and provides necessary instructions.

3. **Handle Variations in Questions:**
   - Can handle long or complex queries.
   - Ignores unrelated questions, such as inquiries about movies or non-CDP topics.

## Data Sources
- [Segment Documentation](https://segment.com/docs/?ref=nav)
- [mParticle Documentation](https://docs.mparticle.com/)
- [Lytics Documentation](https://docs.lytics.com/)
- [Zeotap Documentation](https://docs.zeotap.com/home/en-us/)

## Technologies Used
### **Frontend**
- React.js
- Tailwind CSS
- JavaScript

### **Backend**
- Express.js
- @google/generative-ai (^0.22.0)
- Axios (^1.8.1)
- Cheerio (^1.0.0)
- Cors (^2.8.5)
- Dotenv (^16.4.7)
- Faiss-node (^0.5.1)
- Langchain (^0.3.19)
- Nodemon (^3.1.9)

## Setup & Installation
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/queryai.git
   cd queryai
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory and add the required configurations.

4. **Run the Application:**
   ```sh
   npm start
   ```

## Usage
- Ask queries related to Segment, mParticle, Lytics, or Zeotap.
- QueryAI fetches and displays relevant answers from the documentation.
- The chatbot intelligently ignores non-CDP-related queries.

## Future Improvements
- Expand support for more CDPs.
- Improve natural language processing for better query understanding.
- Add voice interaction capabilities.


🚀 **Built with passion for seamless CDP integration!**
