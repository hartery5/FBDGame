class question {
  constructor(impath, description, ans, hints){
    this.impath = impath;
    this.description = description;
    this.keys = ans;
    this.hints = hints;
  }
  
  removeHint(hi){
    if (this.hints.length>0){
      this.hints.splice(hi,1);
    }
  }
  
  load_key(vectors){
    this.ans = [];
    for (let i=0; i<this.keys.length; i++){
      let key = this.keys[i]
      let slist = [];
      for (let j=0;j<key.length;j++){
        slist.push(vectors[key[j]]);
      }
      this.ans.push(slist);
    }
    print(this.ans);
  }
  
  check_ans(ans){
    let flag = false
    let resp = '';
    print(this.ans[0])
    for (let k=0; k<this.ans.length;k++){
      let cans = this.ans[k];
      print(cans)
      let m = 0;
      for (let i = 0; i<cans.length; i++){
        let csum = 0
        for (let j= 0; j<ans.length; j++){
          if ((cans[i].vmag==ans[j].vmag) && (cans[i].theta==ans[j].theta)){
            break;
          } else {
            csum += 1;
          }
        }
        if (csum<ans.length) {
          continue
        } else {
          m+=1;
        }
      }
      print(m)
      let e = 0;
      for (let i = 0; i<ans.length; i++){
        let csum = 0
        for (let j= 0; j<cans.length; j++){
          if ((cans[j].vmag==ans[i].vmag) && (cans[j].theta==ans[i].theta)){
            break;
          } else {
            csum += 1;
          }
        }
        if (csum<cans.length) {
          continue
        } else {
          e+=1;
        }
      }
      print(e)
      if ((m==0) && (e==0)){
        flag = true;
        resp = "Correct!";
      } else if ((m>0) && (e==0)){
        resp = "Incorrect. Missing a force.";
      } else if ((m==0) && (e>0)){
        resp = "Incorrect. Incorrect force present.";
      } else {
        resp = "Incorrect. Missing force(s), and incorrect force(s) present."
      }
      if (flag){
        return resp;
      }
    }
    return resp
  }
}