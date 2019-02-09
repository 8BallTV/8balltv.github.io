function generateTestCases() {
  testCasesArray = [
    [ new Date('Thu, 01 Jan 2019 08:02:36'), "result.mp3", 156 ],
    [ new Date('Thu, 01 Jan 2019 04:42:17'), "continued.mp3", (30 + 12) * 60 + 17],
    [ new Date('Thu, 01 Jan 2019 12:00:00'), "planet.mp3", 0 ],
    [ new Date('Thu, 01 Jan 2019 12:15:00'), "planet.mp3", 900 ],
    [ new Date('Thu, 01 Jan 2019 11:59:59'), "sunlight.mp3", (45 + 14) * 60 + 59],
    [ new Date('Thu, 01 Jan 2019 01:30:00'), "future.mp3", 30 * 60],
  ]
}
