using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RAAP.Contracts.Control
{
    public enum ControlStatus
    {
        NotImplemented = 1,
        Executed = 2,
        Planned = 3,
        EndOfLife = 4,
    }
}
