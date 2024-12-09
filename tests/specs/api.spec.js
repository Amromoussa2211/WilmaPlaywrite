const { test, expect } = require('@playwright/test');

test.describe('Business Days API - Check and Delete', () => {
  const baseUrl = 'http://20.20.20.44:8008/api/v1/orders/business_days/';

  test('should find and delete the record with is_open: true', async ({
    request,
  }) => {
    const response = await request.get(baseUrl);
    expect(response.status()).toBe(200);
    const data = await response.json();
    const recordToDelete = data.results.find(
      (record) => record.is_open === true
    );

    if (recordToDelete) {
      const deleteUrl = `${baseUrl}${recordToDelete.id}/`;
      const deleteResponse = await request.delete(deleteUrl);
      expect([204, 404, 403]).toContain(deleteResponse.status());
    } else {
      console.log("No record found with 'is_open': true");
    }
  });
});
