

 📰 NewsGist – AI-Powered News Summarizer

NewsGist is a modern web application that provides daily news summaries categorized by topics such as General, Technology, Business, Social, and Entertainment. Powered by AI via Perplexity and Model Context Protocol, it offers clean, concise, and insightful news digests for smarter reading.


## 🚀 Features

- 📢 Real-time News Fetching via News API
- 🧠 AI-Powered Summarization with Perplexity & OpenAI
- 📚 Categorized News (General, Technology, Business, Social, Entertainment)
- 🧩 MCP (Model Context Protocol) for better context understanding
- 👤 User Authentication via Clerk
- 🌙 Dark/Light Theme Toggle
- 🧼 Clean UI using shadcn/ui and Tailwind CSS

---

## 🛠 Tech Stack

| Frontend | Backend | AI & NLP | Auth |
|----------|---------|----------|------|
| Next.js 15  | Perplexity AI | Clerk |
| Tailwind CSS | Edge Runtime | OpenAI / Perplexity SDK | Clerk SDK |
| shadcn/ui | Model Context Protocol |  

---

## 📂 Project Structure

/app ├── explore/         # News by category ├── summary/         # AI summaries └── api/             # News + AI endpoints /components ├── ui/              # Shadcn UI components ├── cards/           # News summary cards └── layout/          # Navbar, sidebar, etc. /lib ├── news.actions.ts  # Fetch and summarize logic └── ai.ts            # Perplexity + MCP interaction /types └── index.ts         # Type definitions

---

## 🧪 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/newsgist.git
cd newsgist

2. Install Dependencies

npm install

3. Set Up Environment Variables

Create a .env.local file:

NEWS_API_KEY=your_news_api_key
PERPLEXITY_API_KEY=your_perplexity_api_key
CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret

4. Run Locally

npm run dev

Visit http://localhost:3000


---

🤖 AI Summarization Flow

1. News articles are fetched from NewsAPI.


2. Each article's content is sent to the AI layer.


3. AI generates:

Concise summaries

Highlight points

Cause-effect or social/business implications



4. Output is rendered in clean cards via shadcn UI.




---

📦 Future Improvements

[ ] Bookmark / Save articles

[ ] Share to social platforms

[ ] Personalized recommendations

[ ] Voice-assisted reading

[ ] Native mobile app



---

📜 License

This project is licensed under MIT.


---

🙌 Acknowledgements

NewsAPI.org

Perplexity AI

shadcn/ui

Clerk.dev

OpenAI



---

> Built with ❤️ using Next.js + AI to help you stay informed, faster by KrishnaVamsi Pinninti.

💬contact-krishpinninti789@gmail.com

---



