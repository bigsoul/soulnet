using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Soulnet.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Soulnet.Data;
using Soulnet.Model.Entity;

namespace Soulnet.Data
{
    public class EntityBaseRepository<T> where T : class, IEntityBase, new()
    {
        public SoulnetContext _context;

        public EntityBaseRepository(SoulnetContext context) {
            _context = context;
        }

        public T GetSingle(string id) {
            return _context.Set<T>().FirstOrDefault(x => x.Id.ToString() == id);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate) {
            return _context.Set<T>().FirstOrDefault(predicate);
        }

        public T GetSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties) {
            IQueryable<T> query = _context.Set<T>();
            
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(predicate).FirstOrDefault();
        }

        public virtual IEnumerable<T> GetAll() {
            return _context.Set<T>().AsEnumerable();
        }

        public virtual int Count() {
            return _context.Set<T>().Count();
        }

        public virtual IEnumerable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties) {
            IQueryable<T> query = _context.Set<T>();

            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.AsEnumerable();
        }

        public virtual IEnumerable<T> FindBy(Expression<Func<T, bool>> predicate) {
            return _context.Set<T>().Where(predicate);
        }

        public Section<T> GetSection(int dataOffset, int dataLimit, string filter) {
            var t = new Section<T>();
            var l = t.List;
            return new Section<T>();
        }

        public virtual void Add(T entity) {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            _context.Set<T>().Add(entity);
        }

        public virtual void Update(T entity) {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }
        
        public virtual void Delete(T entity) {
            EntityEntry dbEntityEntry = _context.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual void DeleteWhere(Expression<Func<T, bool>> predicate) {
            IEnumerable<T> entities = _context.Set<T>().Where(predicate);

            foreach(var entity in entities)
            {
                _context.Entry<T>(entity).State = EntityState.Deleted;
            }
        }

        public virtual void Commit() {
            _context.SaveChanges();
        }

        // utils

        public void FillLearningWithTestData() {
            for (var i = 100; i < 300; i++)
            {
                _context.Learning.Add(new Learning {
                    Id = new Guid(),
                    Name = $"Learning #{i}",
                    State = 0,
                    IsArchive = (i % 2) == 0 ? true : false,
                    IterationCount = i * 2,
                    IterationCurrent = i,
                    InputNeuronsCount = 5,
                    DeepLayersCount = 2,
                    DatasetId = new Guid("8dbfe239-1f04-47b2-bbbe-15f2ea15be2c")
                });
            }

            _context.SaveChanges();
        }

    }

    public struct Section<T> {
        public IEnumerable<T> List;
        public int DataOffset;
        public int DataLimit;
    }
}