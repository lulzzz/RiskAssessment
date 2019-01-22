﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Control
{
    [DataContract]
    public class Control : UpdateControl
    {
        [DataMember]
        public DateTime CreatedOn { get; set; }

        [DataMember]
        public DateTime UpdatedOn { get; set; }

        [DataMember]
        public User.User ResponsibleUser { get; set; }

        [DataMember]
        public User.User AlertUser { get; set; }
    }
}
