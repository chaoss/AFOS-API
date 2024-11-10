import axios from 'axios';

class GitHubService {
  constructor() {
    this.clientId = process.env.GITHUB_CLIENT_ID;
    this.clientSecret = process.env.GITHUB_CLIENT_SECRET;
    this.redirectUri = process.env.GITHUB_CALLBACK_URL;
  }

  getAuthUrl() {
    const scope = 'public_repo';
    return `https://github.com/login/oauth/authorize?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&scope=${scope}`;
  }

  async getAccessToken(code) {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        redirect_uri: this.redirectUri,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    return response.data.access_token;
  }

  async createIssue(accessToken, owner, repo, title, body) {
    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/issues`,
      {
        title,
        body,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );
    return response.data;
  }

  async verifyUser(accessToken) {
    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    return response.data;
  }
}

export default new GitHubService();
