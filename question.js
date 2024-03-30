class question {
  constructor(data){
    this.imgPath = data['imgPath'];
    this.img = loadImage(this.imgPath);
    this.description = data['description'];
    this.ans = data['keys'];
    this.hints = data['hints'];
  }
  
  removeHint(hi){
    if (this.hints.length>0){
      this.hints.splice(hi,1);
    }
  }
  
  check_ans(ans){
    print("Checking:")
    print(this.ans)
    print(ans)
    let flag = false
    let resp = '';

    for (let k=0; k<this.ans.length;k++){
      let cans = this.ans[k];
      let m = 0;
      for (let i = 0; i<cans.length; i++){
        let csum = 0
        for (let j= 0; j<ans.length; j++){
          if ((cans[i]==ans[j])){
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
      let e = 0;
      for (let i = 0; i<ans.length; i++){
        let csum = 0
        for (let j= 0; j<cans.length; j++){
          if (cans[j]==ans[i]){
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