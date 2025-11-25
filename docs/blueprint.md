# **App Name**: Aurael

## Core Features:

- AI Chatbot: An AI-powered chatbot that adapts its speaking style (Gen Z or Millennial) based on the user's age, offering mood check-ins, journaling prompts, and supportive advice.
- Spotify Mood Playlist Integration: Integrate with Spotify via OAuth to fetch mood-based playlists. Store and refresh tokens securely using Firestore and Cloud Functions, handling token revocation gracefully.
- Habit Tracker: A habit tracker that allows users to add, edit, and track habits, storing data such as habit name, frequency, streak, and last completed date in Firestore.
- AI Affirmations + Notifications: AI-generated affirmations based on user's mood and chat context, delivered via push notifications scheduled with Cloud Scheduler and Cloud Functions. Reminders adjust for timezone changes.
- AI Journaling with Reflections: Users can write daily journal entries, and AI can analyze and provide summaries or reframe content, storing entries in Firestore. The summarization requires the use of an AI tool.
- Breathing Exercises: Animated breathing UI with timer options and optional guided audio to facilitate mindfulness and relaxation.
- Background Music: Embed and play the Spotify track '2d7EY7wxqWaQASrYAJlwN6' on the home/chat screen with a mute/unmute toggle. Optionally fallback to default ambient music if Spotify is disconnected.

## Style Guidelines:

- Primary color: Light pink (#FFB6C1) to evoke a sense of calm and femininity.
- Background color: Soft pink gradient with a heart-shaped glow, similar to the provided image, to create a warm and inviting atmosphere.
- Accent color: Lavender and Orange (#E6E6FA and #FFA500) to provide a soft glowing highlight, creating contrast.
- Headline font: 'Belleza', a humanist sans-serif with personality, chosen to give a modern art/design feel.
- Body font: 'Alegreya', a humanist serif for longer texts that would pair nicely with the display headlines.
- Use soft, ethereal icons to represent different features and moods.
- Employ a layout featuring rounded cards and pastel translucent containers to enhance the dreamy aesthetic.
- Incorporate subtle animations such as aura wave backgrounds and floating orbs for a mystical touch.