import CustomError from "../presentation/errors/custom.error"

export const RequestResource = async (URL: string) => {
  try {
    const request = await fetch(URL)
    const parse = await request.json()
    return parse
  } catch (err) {
    console.log(err)
    throw new CustomError('Something went wrong while fetching the repository. Please check repository and owner names', 500)
  }
}