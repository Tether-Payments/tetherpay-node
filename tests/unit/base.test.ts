import fetchMock from 'fetch-mock';

import { Base } from '../../src/base';
import { getMockedKeyPair } from '../utils';

const mockedKeyPair = getMockedKeyPair();

class TestClient extends Base {
  async mockEndpoint(): Promise<any> {
    const result = await this.request<any>(`/test`);
    return result;
  }
}

describe('base', () => {
  beforeAll(() => {
    fetchMock.mockGlobal().route('http://example.com/test', {}, 'baseTest');
  });
  afterAll(() => {
    fetchMock.unmockGlobal();
  })

  it('throws an error for missing serverUri', async () => {
    expect(
      () =>
        new TestClient({
          privateKey: mockedKeyPair.privateKey,
          serverUri: '',
        })
    ).toThrow('serverUri is required');
  });
  it('throws an error for missing privateKey', async () => {
    expect(
      () =>
        new TestClient({
          privateKey: '',
          serverUri: 'http://example.com',
        })
    ).toThrow('privateKey is required');
  });

  describe('request', () => {
    it('calls fetch to make the request', async () => {
      const testClient = new TestClient({
        privateKey: mockedKeyPair.privateKey,
        serverUri: 'http://example.com',
      });

      await testClient.mockEndpoint();
      expect(fetchMock.callHistory.called('baseTest')).toBeTruthy();
    });
  });
});
