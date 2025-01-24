import { Timestamp } from 'firebase/firestore';
import { timeAgo } from './timeAgo';

describe('timeAgo', () => {
  it('returns "x seconds ago" for timestamps less than 60 seconds old', () => {
    const now = new Date();
    const mockTimestamp = Timestamp.fromDate(
      new Date(now.getTime() - 30 * 1000)
    ); // 30 seconds ago
    expect(timeAgo(mockTimestamp)).toBe('30 seconds ago');
  });

  it('returns "x minutes ago" for timestamps less than an hour old', () => {
    const now = new Date();
    const mockTimestamp = Timestamp.fromDate(
      new Date(now.getTime() - 15 * 60 * 1000)
    ); // 15 minutes ago
    expect(timeAgo(mockTimestamp)).toBe('15 minutes ago');
  });

  it('returns "x hours ago" for timestamps less than a day old', () => {
    const now = new Date();
    const mockTimestamp = Timestamp.fromDate(
      new Date(now.getTime() - 5 * 60 * 60 * 1000)
    ); // 5 hours ago
    expect(timeAgo(mockTimestamp)).toBe('5 hours ago');
  });

  it('returns "x days ago" for timestamps less than a week old', () => {
    const now = new Date();
    const mockTimestamp = Timestamp.fromDate(
      new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
    ); // 3 days ago
    expect(timeAgo(mockTimestamp)).toBe('3 days ago');
  });

  it('returns "x weeks ago" for timestamps more than a week old', () => {
    const now = new Date();
    const mockTimestamp = Timestamp.fromDate(
      new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000)
    ); // 2 weeks ago
    expect(timeAgo(mockTimestamp)).toBe('2 weeks ago');
  });
});
