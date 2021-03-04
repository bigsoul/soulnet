using System;
using IronPython.Hosting;
using Microsoft.Scripting.Hosting;

namespace Soulnet.Neuron
{
    class Program
    {
        static void Main(string[] args)
        {
            ScriptEngine engine = Python.CreateEngine();
            ScriptScope scope = engine.CreateScope();
            //engine.Execute("print 'hello, world'");
            engine.ExecuteFile("./core/start.py", scope);
        }
    }
}
