class Orange {
  constructor(page) {
    this.page = page;
    this.username = 'input[name="username"]';
    this.password = 'input[name="password"]';
    this.loginButton = 'button[type="submit"]';
  }

  async navigateToLoginPage() {
    await this.page.goto(
      'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );
  }

  async fillUsername(username) {
    await this.page.fill(this.username, username);
  }

  async fillPassword(password) {
    await this.page.fill(this.password, password);
  }

  async clickLoginButton() {
    await this.page.click(this.loginButton);
  }
}

export default Orange;
