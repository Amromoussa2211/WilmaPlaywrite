class GooglePage {
  constructor(page) {
    this.page = page;
    this.searchInput = '[name="q"]';
    this.searchButton = '[name="btnK"]';
  }

  async navigate() {
    await this.page.goto('/');
  }

  async searchFor(query) {
    await this.page.fill(this.searchInput, query);
    await this.page.press(this.searchInput, 'Enter');
  }

  async verifySearchResult(expectedText) {
    const content = await this.page.textContent('body');
    return content.includes(expectedText);
  }
}

module.exports = GooglePage;
