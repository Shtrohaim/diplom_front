export default interface publisherInfoType {
  SJR: { [key: string]: number }
  SNIP: { [key: string]: number }
  aggregationType: string
  citeScoreYearInfoList: { [key: string]: number }
  coverageEndYear: number
  coverageStartYear: number
  eIssn: string
  issn: string
  'origin-link': string
  publisher: string
  openaccess: number
  'subject-area': { [key: string]: string }[]
  title: string
}
