// To simulate AI response
export const getAIResponse = async (userMessage: string): Promise<string> =>
  new Promise((resolve) => setTimeout(() => resolve(userMessage), 1000));
