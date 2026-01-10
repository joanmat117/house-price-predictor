
export function genArrayRange(from:number,to:number){
  let arr = []
  const minNumber = from > to? to : from
  const maxNumber = from > to? from : to
  for(let i = minNumber;i<=maxNumber;i++){
    arr.push(i)
  }
  return arr
}
