export default interface ScopusList {
  title: string
  'scopus-id': string
  eid: string
  creator: string
  publisher: string
  issn: string
  eIssn: string
  volume: number
  doi: string
  'citedby-count': number
  aggregationType: string
  subtypeDescription: string
  openaccessFlag: boolean
  affiliation: string[]
}
