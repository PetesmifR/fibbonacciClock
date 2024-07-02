function cookieObject_set(value, expires) 
  {
  this.expires.setDate(this.expires.getDate() + (expires ? expires : 365))// if no expiry date allow to expire after 1 year
  document.cookie = this.name + '=' + escape(value)   + '; expires=' + this.expires.toUTCString();
}

function cookieObject_get()
  {
   if (document.cookie.length > 0)
    {
    //alert(this.name)
	var offset = document.cookie.indexOf(this.name + '=')
    if (offset+1)
      {
       offset += this.name.length+1
       var end = (document.cookie.indexOf(';', offset)+1) ? document.cookie.indexOf(';', offset) : document.cookie.length
      return unescape(document.cookie.substring(offset, end))
      }
      return null
    }
    else return null
  }

function cookieObject_getObject()
  {
  var cookieValue=this.get(this.name)
  if (!cookieValue) return null
  var cookieObject = {}
  var elements= cookieValue.split(',')
  for (var i=0;i<elements.length;i++)
    {
    var nameValue=elements[i].split(':')
    if (nameValue[1]) cookieObject[nameValue[0]]= !isNaN(parseFloat(nameValue[1])) ? parseFloat(nameValue[1]) : (nameValue[1].indexOf(true)+1) ? true : (nameValue[1].indexOf(false)+1) ? false : nameValue[1]
    }
  return cookieObject
  }

  function cookieObject_getArray()
  {
  var cookieValue=this.get(this.name)
  if (!cookieValue) return null
  var cookieArray = cookieValue.split('^')
  return cookieArray
  }  

  function cookieObject_setObject(cookieObject)
  {
  cookieValue=''
  for (var i in cookieObject)
    {
    cookieValue+=i+':'+cookieObject[i]+','
    }
  this.set(cookieValue)
   }
  
function cookieObject_setArray(cookieArray)
  {
  cookieValue=''
  for (var i=0;i<cookieArray.length;i++)
    {
    cookieValue+=cookieArray[i]+'^'
    }
  this.set(cookieValue)
  }
  
  function cookieObject(name)
  {
  this.name=name
  this.expires= new Date()
  
  this.get=cookieObject_get
  this.set=cookieObject_set
  this.getObject=cookieObject_getObject
  this.setObject=cookieObject_setObject
  this.getArray=cookieObject_getArray
  this.setArray=cookieObject_setArray

  }
  
  
