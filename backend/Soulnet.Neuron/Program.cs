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
            engine.Execute("print 'hello, world'");
        }
    }
}
